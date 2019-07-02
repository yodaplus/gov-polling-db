const {
  makeRawLogExtractors,
} = require("spock-etl/lib/core/extractors/instances/rawEventDataExtractor");

const mkrTransformer = require("./transformers/MkrTransformer");
const pollingTransformer = require("./transformers/PollingTransformer");
const dsChiefTransformer = require("./transformers/DsChiefTransformer");
const voteProxyFactoryTransformer = require("./transformers/VoteProxyFactoryTransformer");

const MKR_ADDRESS = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";

//kovan
const MKR_KOVAN_ADDRESS = "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd";
const VOTING_CONTRACT_KOVAN_ADDRESS = "0x500536350bb32b05210bcb412a720a0e7c8a36bc";
const DSCHIEF_KOVAN_ADDRESS = "0xbbffc76e94b34f72d96d054b31f6424249c1337d";
const VOTE_PROXY_FACTORY_KOVAN_ADDRESS = "0x3e08741a68c2d964d172793cd0ad14292f658cd8";

const kovan = {
  startingBlock: 8695460,
  extractors: [
    ...makeRawLogExtractors([
      VOTING_CONTRACT_KOVAN_ADDRESS,
      MKR_KOVAN_ADDRESS,
      DSCHIEF_KOVAN_ADDRESS,
      VOTE_PROXY_FACTORY_KOVAN_ADDRESS,
    ]),
  ],
  transformers: [
    pollingTransformer,
    mkrTransformer(MKR_KOVAN_ADDRESS),
    dsChiefTransformer(DSCHIEF_KOVAN_ADDRESS),
    voteProxyFactoryTransformer(VOTE_PROXY_FACTORY_KOVAN_ADDRESS),
  ],
  migrations: {
    mkr: "./migrations",
  },
};

const mainnet = {
  startingBlock: 4620855,
  extractors: [...makeRawLogExtractors([MKR_ADDRESS])],
  transformers: [mkrTransformer(MKR_ADDRESS)],
  migrations: {
    mkr: "./migrations",
  },
};

module.exports.default = kovan;
