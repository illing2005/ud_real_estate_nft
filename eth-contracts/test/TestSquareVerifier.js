var Verifier = artifacts.require("Verifier");

contract("TestVerifier", (accounts) => {
  describe("Verify Tx", function () {
    beforeEach(async function () {
      this.contract = await Verifier.new({
        from: accounts[0],
      });
    });

    it("Correct verification", async function () {
      const { proof, input } = require("../../zokrates/code/square/proof.json");
      const verified = await this.contract.verifyTx.call(
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
      assert.equal(verified, true, "Proof did not verify");
    });

    it("Verifier captures wrong input", async function () {
      const {
        proof_error,
        input_error,
      } = require("../../zokrates/code/square/proof_error.json");
      let reverted = false;
      try {
        await this.contract.verifyTx.call(
          proof_error.A,
          proof_error.A_p,
          proof_error.B,
          proof_error.B_p,
          proof_error.C,
          proof_error.C_p,
          proof_error.H,
          proof_error.K,
          input_error
        );
      } catch (e) {
        reverted = true;
      }
      assert.equal(reverted, true, "Wrong proof should not verify");
    });
  });
});
