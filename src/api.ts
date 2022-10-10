import axios from "axios";
const API_URL = `https://fusion-b.herokuapp.com/api`;

export const pushDistributorInfo = async ({
  distributorAddress,
  creatorWallet,
  optionMarketKey,
  optionTokenQty,
  description,
  isMainnet,
  recipients,
}: {
  distributorAddress: string;
  creatorWallet: string;
  optionMarketKey: string;
  optionTokenQty: number;
  description: string;
  isMainnet: boolean;
  recipients: { recipient: string; amount: string }[];
}) => {
  try {
    await axios.post(API_URL + "/distributors", {
      distributorAddress,
      creatorWallet,
      optionMarketKey,
      optionTokenQty,
      description,
      isMainnet,
      recipients: recipients.map(({ recipient, amount }) => ({
        recipient,
        amount: Number(amount),
      })),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getAvailableDistributors = async ({
  wallet,
  isMainnet,
}: {
  wallet: string;
  isMainnet: boolean;
}) => {
  try {
    const { data } = await axios.get(
      API_URL + `/distributors/${wallet}/${isMainnet ? 1 : 0}`
    );
    console.log({ data });
    return Promise.resolve(data?.rows ?? []);
  } catch (error) {
    console.log({ error });
    return Promise.resolve([]);
  }
};

export const getRecipientsForDistributor = async ({
  distributorAddress,
}: {
  distributorAddress: string;
}) => {
  try {
    const { data } = await axios.get(
      API_URL + `/recipients/${distributorAddress}`
    );
    console.log({ data });
    return Promise.resolve(data?.rows ?? []);
  } catch (error) {
    console.log({ error });
    return Promise.resolve([]);
  }
};

export const handleExercise = async (payload: {
  wallet: string;
  optionMarketKey: string;
  exercisedQty: number;
}) => {
  try {
    await axios.post(API_URL + `/handleExercise`, payload);
    return Promise.resolve(true);
  } catch (error) {
    console.log({ error });
    return Promise.resolve(false);
  }
};

export const handleClaim = async (payload: {
  wallet: string;
  distributorAddress: string;
  claimedQty: number;
}) => {
  try {
    await axios.post(API_URL + `/handleClaim`, payload);
    return Promise.resolve(true);
  } catch (error) {
    console.log({ error });
    return Promise.resolve(false);
  }
};
