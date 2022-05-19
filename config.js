const {
  makeRawLogExtractors,
} = require("@yodaplus/spock-etl/lib/core/processors/extractors/instances/rawEventDataExtractor");

const mkrTransformer = require("./transformers/MkrTransformer");
const mkrBalanceTransformer = require("./transformers/MkrBalanceTransformer");
const chiefBalanceTransformer = require("./transformers/ChiefBalanceTransformer");
const pollingTransformerImport = require("./transformers/PollingTransformer");
const pollingTransformer = pollingTransformerImport.default;
const dsChiefTransformer = require("./transformers/DsChiefTransformer");
const voteProxyFactoryTransformer = require("./transformers/VoteProxyFactoryTransformer");
const esmTransformer = require("./transformers/EsmTransformer");
const voteDelegateFactoryTransformer = require("./transformers/VoteDelegateFactoryTransformer");

//mainnet
const MKR_ADDRESS = "0xB643d716608ba491dC50D4fc414B1530b2aE32E4";
const VOTING_CONTRACT_ADDRESS =
  pollingTransformerImport.VOTING_CONTRACT_ADDRESS;
const DSCHIEF_ADDRESS = "0x4796dC3110bc1db8064910485b6c21451ff8f285";
const VOTE_PROXY_FACTORY_ADDRESS = "0xfC9D474Cf20188ED02BBE01e6374Cd0F2955E386";
const ESM_ADDRESS = "0xC486Fd2F80Dbe562C66Cee3A4D5a745Db7D3807d";
const VOTE_DELEGATE_FACTORY_ADDRESS =
  "0x40eA527Bd8b57a178B9F432279bc3b06C730BEb9";

//apothem
const MKR_ADDRESS_APOTHEM = "0xB643d716608ba491dC50D4fc414B1530b2aE32E4";
const VOTING_CONTRACT_ADDRESS_APOTHEM =
  pollingTransformerImport.VOTING_CONTRACT_APOTHEM_ADDRESS;
const DSCHIEF_ADDRESS_APOTHEM = "0x4796dC3110bc1db8064910485b6c21451ff8f285";
const VOTE_PROXY_FACTORY_ADDRESS_APOTHEM =
  "0xfC9D474Cf20188ED02BBE01e6374Cd0F2955E386";
const ESM_ADDRESS_APOTHEM = "0xC486Fd2F80Dbe562C66Cee3A4D5a745Db7D3807d";
const VOTE_DELEGATE_FACTORY_ADDRESS_APOTHEM =
  "0x40eA527Bd8b57a178B9F432279bc3b06C730BEb9";

const apothem = {
  startingBlock: 32463262,
  extractors: [
    ...makeRawLogExtractors([
      MKR_ADDRESS_APOTHEM,
      VOTING_CONTRACT_ADDRESS_APOTHEM,
      DSCHIEF_ADDRESS_APOTHEM,
      VOTE_PROXY_FACTORY_ADDRESS_APOTHEM,
      ESM_ADDRESS_APOTHEM,
      VOTE_DELEGATE_FACTORY_ADDRESS_APOTHEM,
    ]),
  ],
  transformers: [
    pollingTransformer(VOTING_CONTRACT_ADDRESS_APOTHEM),
    mkrTransformer(MKR_ADDRESS_APOTHEM),
    mkrBalanceTransformer(MKR_ADDRESS_APOTHEM),
    dsChiefTransformer(DSCHIEF_ADDRESS_APOTHEM),
    chiefBalanceTransformer(DSCHIEF_ADDRESS_APOTHEM),
    voteProxyFactoryTransformer(VOTE_PROXY_FACTORY_ADDRESS_APOTHEM),
    esmTransformer(ESM_ADDRESS_APOTHEM),
    voteDelegateFactoryTransformer(VOTE_DELEGATE_FACTORY_ADDRESS_APOTHEM),
  ],
  migrations: {
    mkr: "./migrations",
  },
  api: {
    whitelisting: {
      enabled: false,
    },
    responseCaching: {
      enabled: false,
      duration: "15 seconds",
    },
  },
};

const mainnet = {
  startingBlock: 32463262,
  extractors: [
    ...makeRawLogExtractors([
      MKR_ADDRESS,
      VOTING_CONTRACT_ADDRESS,
      DSCHIEF_ADDRESS,
      VOTE_PROXY_FACTORY_ADDRESS,
      ESM_ADDRESS,
      VOTE_DELEGATE_FACTORY_ADDRESS,
    ]),
  ],
  transformers: [
    pollingTransformer(VOTING_CONTRACT_ADDRESS),
    mkrTransformer(MKR_ADDRESS),
    mkrBalanceTransformer(MKR_ADDRESS),
    dsChiefTransformer(DSCHIEF_ADDRESS),
    chiefBalanceTransformer(DSCHIEF_ADDRESS),
    voteProxyFactoryTransformer(VOTE_PROXY_FACTORY_ADDRESS),
    esmTransformer(ESM_ADDRESS),
    voteDelegateFactoryTransformer(VOTE_DELEGATE_FACTORY_ADDRESS),
  ],
  migrations: {
    mkr: "./migrations",
  },
  api: {
    whitelisting: {
      enabled: false,
    },
    responseCaching: {
      enabled: false,
      duration: "15 seconds",
    },
  },
};

let config;
if (process.env.VL_CHAIN_NAME === "mainnet") {
  console.log("Using mainnet config");
  config = mainnet;
} else {
  console.log("Using apothem config");
  config = apothem;
}

module.exports.default = config;
