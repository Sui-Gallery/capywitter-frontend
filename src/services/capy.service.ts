import { GAS_FEE } from "@/utils/constants";
import { WalletContextState } from "@suiet/wallet-kit";
import axios from "axios";
import { any } from "superstruct";
import { JsonRpcProvider, SuiEventEnvelope } from "@mysten/sui.js";
import { executionAsyncResource } from "async_hooks";

export const subscribePublishEvents = async (packageId: string, provider: JsonRpcProvider, cb: (event: SuiEventEnvelope) => void) => {
  const eventType = packageId + "::cpwtoken::" + "ExchangeEvent";
  const subscriptionId = await provider.subscribeEvent({
    MoveEventType: eventType
  }, cb)
}

export const subscribeExchangeEvents = async (packageId: string, provider: JsonRpcProvider, cb: (event: SuiEventEnvelope) => void) => {
  const eventType = packageId + "::twitter::" + "PublishEvent";
  const subscriptionId = await provider.subscribeEvent({
    MoveEventType: eventType
  }, cb)
}

export const getObject = async (objectId: string) => {
  if (!objectId) return false;
  return await axios({
    method: "post",
    url: "https://fullnode.devnet.sui.io:443",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getObject",
      params: [objectId],
    },
  })
    .then((res: any) => {
      return res?.data?.result;
    })
    .catch((err) => {
      console.log("ERROR: Couldn't fetch object", err);
      return false;
    });
};

export const getCapiesList = async (address: string): Promise<Array<any>> => {
  if (!address) {
    console.log("ERROR: Address is not given");
    return [];
  }

  const allObjects = await axios({
    method: "post",
    url: "https://fullnode.devnet.sui.io:443",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getObjectsOwnedByAddress",
      params: [address],
    },
  })
    .then((res: any) => {
      return res?.data?.result;
    })
    .catch((err) => {
      console.log("ERROR: Couldn't fetch objects", err);
      return [];
    });

  if (!(allObjects.length > 0)) {
    console.log("ERROR: No object is found");
    return [];
  }

  const filteredObjects = allObjects?.filter((suiObj: any) => {
    if (
      typeof suiObj?.type === "string" &&
      (suiObj.type as string).endsWith("::Capy")
    ) {
      return true;
    }
    return false;
  });

  return await Promise.all(
    filteredObjects.map(async (suiObj: any) => {
      const objDetail = await getObject(suiObj?.objectId);
      if (objDetail) {
        return objDetail;
      }
    })
  );
};

export const exchangeCapy = async (
  wallet: WalletContextState,
  capyList: string[]
) => {
  try {
    if (wallet.connected) {
      const result = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: "moveCall",
          data: {
            packageObjectId: process.env.NEXT_PUBLIC_PACKAGE_ID as string,
            module: "cpwtoken",
            function: "exchange_tokens_for_capy",
            typeArguments: [],
            arguments: [capyList, process.env.NEXT_PUBLIC_RESERVE_ID as string],
            gasBudget: 10000,
          },
        },
      });
      console.log("exchange result", result);
      return result;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCpwBalance = async (address: string) => {
  const tokenType =
    process.env.NEXT_PUBLIC_PACKAGE_ID + "::cpwtoken::" + "CPWTOKEN";
  const balance: any = await axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_RPC_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getBalance",
      params: [address, tokenType],
    },
  })
    .then((res: any) => {
      return res?.data?.result.totalBalance;
    })
    .catch((err) => {
      console.log("ERROR: Couldn't fetch objects", err);
      return "0";
    });
  console.log(balance);
  return balance;
};

export const splitCoin = async (
  wallet: WalletContextState,
  signerAddress: string,
  coinId: string,
  splitAmts: number[]
) => {
  if (wallet.connected) {
    const result = await wallet.signAndExecuteTransaction({
      transaction: {
        kind: "splitCoin",
        data: {
          coinObjectId: coinId,
          splitAmounts: splitAmts,
          gasBudget: GAS_FEE,
        },
      },
    });
    console.log("Result of split txn");
    console.log(result);
  }
};

export const mergeCoins = async () => {
  // test commit
  console.log("tes");
};

// component function
export const publishText = async (
  wallet: WalletContextState,
  text: string,
  offer: number,
  index: number
) => {
  if (wallet.connected && wallet.address) {
    console.log(await wallet.getPublicKey());
    // First get all the tokens owned by wallet
    const address = wallet.address;
    const tokenType =
      process.env.NEXT_PUBLIC_PACKAGE_ID + "::cpwtoken::" + "CPWTOKEN";

    console.log(address);
    console.log(tokenType);

    const cpwTokens: any[] = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_RPC_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getCoins",
        params: [address, tokenType],
      },
    })
      .then((res: any) => {
        return res?.data?.result.data;
      })
      .catch((err) => {
        console.log("ERROR: Couldn't fetch objects", err);
        return [];
      });

    console.log("cpwTokens", cpwTokens);
    let singleTokenEnough: boolean = false;
    let tokenToUse = "";
    let usedBalance = -1;
    cpwTokens.forEach((token) => {
      if (token.balance >= offer) {
        singleTokenEnough = true;
        tokenToUse = token.coinObjectId;
        usedBalance = token.balance;
      }
    });

    if (singleTokenEnough) {
      if (usedBalance == offer) {
        // dont split directly publish
      } else {
        await splitCoin(wallet, address, tokenToUse, [usedBalance - offer]);
      }
    } else {
      let amountEnough = false
      let tokenIdx = 0
      let totalAmt = 0
      let tokenToMerge: any[] = []
      while (!amountEnough) {
        if (tokenIdx >= cpwTokens.length) {
          console.error("Not enough budget")
          //TODO buraya girmemesinden emin olmalısın ramazan başta balance >= offer olmalı
        }
        let curToken = cpwTokens[index]
        totalAmt += curToken.balance
        tokenToMerge.push(curToken)
        tokenIdx += 1
        if (totalAmt >= offer) {
          amountEnough = true
        }
      }

      let primaryToken = cpwTokens[0]
      for (let token of cpwTokens.slice(1)) {
        const res = await wallet.signAndExecuteTransaction({
          transaction: {
            kind: "mergeCoin",
            data: {
              primaryCoin: primaryToken.coinObjectId,
              coinToMerge: token.coinObjectId,
              gasBudget: GAS_FEE,
            }
          }
        })
      }
      tokenToUse = primaryToken

    }

    const result = await wallet.signAndExecuteTransaction({
      transaction: {
        kind: "moveCall",
        data: {
          packageObjectId: process.env.NEXT_PUBLIC_PACKAGE_ID as string,
          module: "twitter",
          function: "publish_text_by_index",
          typeArguments: [],
          arguments: [
            process.env.NEXT_PUBLIC_TWITTER_ID as string,
            tokenToUse,
            text,
            index,
          ],
          gasBudget: 10000,
        },
      },
    });

    return result;
  }
};
