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
const MKR_ADDRESS = "0xBE83B14835daD188c713e1F2A300bf46fd1bcEBE";
const VOTING_CONTRACT_ADDRESS =
  pollingTransformerImport.VOTING_CONTRACT_ADDRESS;
const DSCHIEF_ADDRESS = "0xD78F0d4B884C7D3Ba644A1b249CE913E1AD895D3";
const VOTE_PROXY_FACTORY_ADDRESS = "0xDed66a1a53eaAf3AAec1D7F53028e84de45Af773";
const ESM_ADDRESS = "0x68199D8330b4Fba1B4C2e0638760DBdD0C46fa6C";
const VOTE_DELEGATE_FACTORY_ADDRESS =
  "0xB55Bf3aDC61511923a1A88D345e01b293e1DC4f6";

//apothem
const MKR_ADDRESS_APOTHEM = "0x9dC974ecc7044884DbB2C267bE29DE01bD423a36";
const VOTING_CONTRACT_ADDRESS_APOTHEM =
  pollingTransformerImport.VOTING_CONTRACT_APOTHEM_ADDRESS;
const DSCHIEF_ADDRESS_APOTHEM = "0x8843EEF577e2F3eC582044da45770e4542217e72";
const VOTE_PROXY_FACTORY_ADDRESS_APOTHEM =
  "0xC54D9F2AEa9D68BE017C66bbD442998A309B2256";
const ESM_ADDRESS_APOTHEM = "0x42f78252dC5cE3de214Ca99158143729e7fc0740";
const VOTE_DELEGATE_FACTORY_ADDRESS_APOTHEM =
  "0x0aC21B3191629Da71CB37edFbaB0B39A2A01A5E3";

const apothem = {
  startingBlock: 37912533,
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
  startingBlock: 46228969,
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
