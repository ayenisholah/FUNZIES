import React from "react";
// @ts-ignore
import { discord, logo, opensea, twitter } from "./assets";
import { Link } from "react-router-dom";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

import AnimatedRoutes from "./components/AnimatedRoutes";
import Header from "./components/Header";

import { Web3Button } from "@web3modal/react";

const chains = [mainnet];
const projectId = "bca4e930ec2efba80c2d4314a9cd6ee0";
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <div className="App bg-[#A9B4B9]  font-Roboto">
      <WagmiConfig client={wagmiClient}>
        <Header />
        <AnimatedRoutes />
        <div className="bg-[#A9B4B9] font-black text-black">
          <Link
            to="/"
            className="absolute top-5 z-2 left-5 text-2xl cursor-pointer items-center justify-start flex"
          >
            <img
              src={logo}
              alt="logo"
              className="w-[40px] h-[40px] rounded-full mr-4"
            />
            <span>Funzies</span>
          </Link>
          <div className="absolute top-6 z-2 right-5 text-2xl cursor-pointer flex-row hidden md:flex">
            <Link to="/info" className="mr-4">
              INFO
            </Link>
            <Link to="/team" className="mr-4">
              TEAM
            </Link>
            <Link to="/roadmap" className="mr-4">
              ROADMAP
            </Link>
            <div className="">
              <Web3Button />
            </div>
          </div>
          <div className="absolute bottom-5 z-2 right-5 text-2xl cursor-pointer flex flex-col">
            <span className="mb-4">
              <img src={twitter} alt="twitter icon" className="w-7 h-7" />
            </span>
            <span className="mb-4">
              <img src={discord} alt="twitter icon" className="w-7 h-7" />
            </span>
            <span>
              <img src={opensea} alt="twitter icon" className="w-7 h-7" />
            </span>
          </div>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;
