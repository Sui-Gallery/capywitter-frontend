import Button from "@/styles/button";
import { isMobile } from "@/utils/utils";
import { JsonRpcProvider } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AvailabilityText from "../availability-text";
import Popup from "../popup";
import axios from "axios";
import { GAS_FEE } from "@/utils/constants";

const FeedStyled = styled.div`
  .feeds-con {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
  }

  .feed-item {
    width: 100%;
    background: #fff;
    padding: 3px;
    border-radius: 7px;
  }

  .feed-head {
    width: 100%;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 16px;
    background: #b9d2af;
    border-radius: 4px;
    padding: 6px 10px;

    .left {
      color: #32446b;
    }

    .right {
      color: #fff;
    }
  }

  .feed-content {
    margin-top: 24px;
    padding-left: 15px;
    padding-right: 21px;
    font-size: 12px;
    line-height: 14px;
    color: #32446b;
    margin-bottom: 18px;
  }

  .feed-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 11px;
    font-size: 12px;
    margin-left: 15px;
    margin-right: 9px;
  }

  .feed-info {
    padding-bottom: 2px;
  }

  .info-title {
    font-weight: 500;
    color: #32446b;
    margin-right: 13px;
  }

  @media screen and (max-width: 650px) {
    .title {
      display: none;
    }
  }
`;

const FeedSection = () => {
  const [popupShow, setPopupShow] = useState(false);
  const wallet = useWallet()

  const provider = useRef<JsonRpcProvider>();

  const initWeb3 = useCallback(async () => {
      provider.current = new JsonRpcProvider(process.env.NEXT_PUBLIC_PACKAGE_ID)
  }, [])

  useEffect(() => {
    initWeb3()
  }, [])

  useEffect(() => {
    publishText("developing sui gallery", 12, 2)
  }, [wallet])

  /* utils functions */

  // coinAmt > requiredAmt

  const createSplitTxn = async (signerAddress: string, coinId: string, splitAmts: number[]) => {
    // first find a gas object
    const suiCoins = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_RPC_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        jsonrpc: "2.0",
        id: 1,
        method: "sui_getCoins",
        params: [signerAddress],
      },
    }).then((res: any) => {
      return res?.data?.result.data;
    })
    .catch((err) => {
      console.log("ERROR: Couldn't fetch objects", err);
      return [];
    });

    let gasToUseId: string = ""
    for (let gasObj of suiCoins) {
      if (gasObj.balance >= GAS_FEE) {
        gasToUseId = gasObj.coinObjectId
      }
    }

    if (gasToUseId == "") {
      console.error("Insufficient gas")
      // todo handle ui
    }

    const splitTxn = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_RPC_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        jsonrpc: "2.0",
        id: 1,
        method: "sui_splitCoin",
        params: [signerAddress, coinId, splitAmts, gasToUseId, 10000],
      },
    })
      .then((res: any) => {
        console.log(res)
        return res?.data?.result;
      })
      .catch((err) => {
        console.log("ERROR: Couldn't fetch objects", err);
        return null;
    });
    console.log(splitTxn)
    return splitTxn
  }

  const splitCoin = async (txnBytes: any) => {
    if (wallet.connected) {
      const txn = await wallet.signAndExecuteTransaction(txnBytes)
      console.log(txn)
    }
  }

  const mergeCoins = async () => {
    
  }

  // component function
  const publishText = async (text: string, offer: number, index: number) => {
    if (wallet.connected && wallet.address) {
      console.log(await wallet.getPublicKey())
    // First get all the tokens owned by wallet
      const address = wallet.address
      const tokenType = process.env.NEXT_PUBLIC_PACKAGE_ID + "::cpwtoken::" + "CPWTOKEN"

      console.log(address)
      console.log(tokenType)
      
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

        console.log(cpwTokens)
        let singleTokenEnough: boolean = false
        let tokenToUse = ""
        let usedBalance = -1
        cpwTokens.forEach(token => {
          if (token.balance >= offer) {
            singleTokenEnough = true
            tokenToUse = token.coinObjectId
            usedBalance = token.balance
          }
        });
      
        if (singleTokenEnough) {
          if (usedBalance == offer) {
            // dont split directly publish
          } else {
            const txnBytes = await createSplitTxn(address, tokenToUse, [usedBalance - offer])
            await splitCoin(txnBytes)
          }
        } else {
          // coins should be merged and tokenToUse should be set
        }

        const result = wallet.signAndExecuteTransaction({
          transaction: {
            kind: "moveCall",
            data: {
              packageObjectId: process.env.NEXT_PUBLIC_PACKAGE_ID as string,
              module: "twitter",
              function: "publish_text_by_index",
              typeArguments: [],
              arguments: [process.env.NEXT_PUBLIC_TWITTER_ID as string, tokenToUse, text, index],
              gasBudget: 10000,
            },
          },
        })
    }
  }

  return (
    <FeedStyled>
      <div className="title">CAPYFEED</div>
      <AvailabilityText />
      <div className="feeds-con">
        {Array.from({ length: 10 }).map((e, index) => (
          <div className="feed-item" key={"feed-item_" + index}>
            <div className="feed-head">
              <div className="left">capyboard: no {index + 1}</div>
              <div className="right">owner: 0x342….ab4gd</div>
            </div>
            <div className="feed-content">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              reprehenderit libero cumque adipisci cum inventore recusandae
              laudantium ?
            </div>
            <div className="feed-footer">
              <div className="feed-info">
                <span className="info-title">current min box price:</span>
                <span>100 CAPYTOKEN</span>
              </div>
              <Button
                $mode="feed-button"
                onClick={() => !isMobile() && setPopupShow(true)}
              >
                Buy This Box!
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Popup content="capyboard" setShow={setPopupShow} show={popupShow} />
    </FeedStyled>
  );
};

export default FeedSection;
