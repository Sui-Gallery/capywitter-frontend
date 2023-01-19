import axios from "axios";

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
