pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

contract SolnSquareVerifier is RealEstateERC721Token {
    Verifier verifier;

    // define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
    }

    // define an array of the above struct
    Solution[] private solutions;

    // define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;

    // Create an event to emit when a solution is added
    event SolutionAdded(address account);

    constructor(address verifierAddress) public {
        verifier = Verifier(verifierAddress);
    }

    // Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 solutionKey, uint256 tokenId) public {
        Solution memory solution = Solution({
            index: tokenId,
            account: msg.sender
        });
        solutions.push(solution);
        uniqueSolutions[solutionKey] = solution;
        emit SolutionAdded(msg.sender);
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mintNFT(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2] memory a_p,
        uint256[2][2] memory b,
        uint256[2] memory b_p,
        uint256[2] memory c,
        uint256[2] memory c_p,
        uint256[2] memory h,
        uint256[2] memory k,
        uint256[2] memory input
    ) public {
        bytes32 solutionKey = keccak256(
            abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input)
        );
        require(
            uniqueSolutions[solutionKey].account == address(0),
            "Solution has already been used"
        );
        require(
            verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input),
            "Solution could not be verified"
        );
        addSolution(solutionKey, tokenId);
        // finally mint the token
        mint(to, tokenId);
    }
}

contract Verifier {
    function verifyTx(
        uint256[2] memory a,
        uint256[2] memory a_p,
        uint256[2][2] memory b,
        uint256[2] memory b_p,
        uint256[2] memory c,
        uint256[2] memory c_p,
        uint256[2] memory h,
        uint256[2] memory k,
        uint256[2] memory input
    ) public returns (bool r);
}
