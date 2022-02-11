var ERC721MintableComplete = artifacts.require("RealEstateERC721Token");
var BigNumber = require("bignumber.js");

contract("RealEstateERC721Token", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const TOTAL_SUPPLY = 20;

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new({ from: account_one });

      // mint multiple tokens
      for (let i = 1; i <= TOTAL_SUPPLY; i++) {
        this.contract.mint(account_two, i, { from: account_one });
      }
    });

    it("should return total supply", async function () {
      const totalSupply = await this.contract.totalSupply.call();
      assert.equal(
        totalSupply,
        TOTAL_SUPPLY,
        `Total supply should be ${TOTAL_SUPPLY}`
      );
    });

    it("should get token balance", async function () {
      const balance = await this.contract.balanceOf.call(account_two);
      assert.equal(balance, 20, "account_two should have 20 tokens");
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      const expected =
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";

      const tokenURI = await this.contract.tokenURI.call(1);
      assert.equal(tokenURI, expected, "Token URI not correct");
    });

    it("should transfer token from one owner to another", async function () {
      const newOwner = account_one;
      const currentOwner = account_two;
      const tokenId = 10;

      await this.contract.transferFrom(currentOwner, newOwner, tokenId, {
        from: currentOwner,
      });

      const actualNewOwner = await this.contract.ownerOf.call(tokenId);
      const balanceNewOwner = await this.contract.balanceOf.call(newOwner);
      const balanceOldOwner = await this.contract.balanceOf.call(currentOwner);
      assert.equal(actualNewOwner, newOwner, "New owner is not correct");
      assert.equal(balanceNewOwner, 1, "Should have 1 token");
      assert.equal(
        balanceOldOwner,
        TOTAL_SUPPLY - 1,
        "Should have less token thank before"
      );
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await ERC721MintableComplete.new({ from: account_one });
    });

    it("should fail when minting when address is not contract owner", async function () {
      let reverted = false;

      try {
        await this.contract.mint(account_two, TOTAL_SUPPLY + 1, {
          from: account_two,
        });
      } catch (e) {
        reverted = true;
      }

      assert.equal(reverted, true, "It should not allow to mint token");
    });

    it("should return contract owner", async function () {
      const owner = await this.contract.getOwner.call();
      assert.equal(owner, account_one, "Does not return contract owner");
    });
  });
});
