// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var Verifier = artifacts.require("Verifier");

contract("TestSolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];

  describe("Mint verified NFT", function () {
    beforeEach(async function () {
      this.verifier = await Verifier.new({
        from: account_one,
      });
      this.contract = await SolnSquareVerifier.new(this.verifier.address, {
        from: account_one,
      });
    });

    it("should verify and mint a token", async function () {
      const { proof, input } = require("../../zokrates/code/square/proof.json");
      await this.contract.mintNFT(
        account_two,
        1,
        proof.A,
        proof.A_p,
        proof.B,
        proof.B_p,
        proof.C,
        proof.C_p,
        proof.H,
        proof.K,
        input
      );
      const accountTwoBalance = await this.contract.balanceOf(account_two);
      assert.equal(accountTwoBalance, 1, "Account should have a token minted");

      // Minting with same solution should fail
      let reverted = false;
      try {
        await this.contract.mintNFT(
          account_two,
          2,
          proof.A,
          proof.A_p,
          proof.B,
          proof.B_p,
          proof.C,
          proof.C_p,
          proof.H,
          proof.K,
          input
        );
      } catch (e) {
        reverted = true;
      }
      assert.equal(reverted, true);
    });
  });
});
