# Real Estate NFT

This project was developed as part of the [Udacity Blockchain Developer Nanodegree Program](https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309)

This project lets you mint NFTs to represent your 
title to properties. 
Before you can mint a NFTs, you need to verify you own the property. 
It uses zk-SNARKs using [ZoKrates](https://zokrates.github.io/) to create a verification 
system which can prove you have title to the property without revealing 
that specific information on the property. 
Minted tokens can be transferred to other addresses. 

## Local development

Start development console and local ethereum blockchain:
```shell script
truffle develop 
```
Compile the solidity contracts:
```shell script
compile
```
Deploy (migrate) contracts to network
```shell script
migrate --reset  # local network
migrate --reset --network rinkeby  # rinkeby test network
```
Run unit tests
```shell script
test
```


## Rinkeby network

This project is deployed to the rinkeby test network:

- Token Name: *RealEstateToken*
- Token Symbol: *RST*
- SolnSquareVerifier address: [0xEB6f785407218E4f0344D4ec72fC572095C48EDf](https://rinkeby.etherscan.io/address/0xEB6f785407218E4f0344D4ec72fC572095C48EDf)
- Verifier address: [0xAd22F1ad9904310458d98dbAcdae5823b63943e0](https://rinkeby.etherscan.io/address/0xad22f1ad9904310458d98dbacdae5823b63943e0)


## OpenSea

10 Nfts are minted and can be traded on OpenSea (testnet):
- [OpenSea RealEstateToken Collection](https://testnets.opensea.io/collection/realestatetoken-udacity)

## Libraries:

- Node v10.24.1
- Truffle v5.2.0
- Solidity v0.5.6
