pragma solidity 0.7.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNft is ERC721, Ownable {
    struct Character {
        uint256 level;
        uint256 nextAvaliableEvolutionTime;
    }

    mapping(uint256 => bool) isUnique;
    mapping(uint256 => Character) public character;

    event minted(string comment, uint256 id);

    uint256 public tokenId;
    uint256 public cooldownForEvolutionTime1;
    uint256 public cooldownForEvolutionTime2;
    uint256 public cooldownForEvolutionTime3;

    constructor() public ERC721("Evolution Characters", "ECS") {
        tokenId = 0;
        cooldownForEvolutionTime1 = 10;
        cooldownForEvolutionTime2 = 20;
        cooldownForEvolutionTime3 = 30;
    }

    function printUniqueAsset(address to, string memory _tokenURI) public {
        require(isUnique[tokenId] != true, "Asset already exists");
        isUnique[tokenId] = true;
        uint256 _tokenId = tokenId;
        tokenId++;
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        character[_tokenId] = Character(
            1,
            block.timestamp + cooldownForEvolutionTime1
        );
        emit minted("Succesfully Minted", _tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function feedNft(uint256 tokenId) public {
        require(
            block.timestamp > character[tokenId].nextAvaliableEvolutionTime
        );
        require(character[tokenId].level != 3, "Already Max Level");

        if (character[tokenId].level == 1) {
            character[tokenId].nextAvaliableEvolutionTime =
                block.timestamp +
                cooldownForEvolutionTime2;
            character[tokenId].level++;
        } else if (character[tokenId].level == 2) {
            character[tokenId].nextAvaliableEvolutionTime =
                block.timestamp +
                cooldownForEvolutionTime3;
            character[tokenId].level++;
        }
    }

    function breed(
        uint256 tokenId1,
        uint256 tokenId2,
        string memory _tokenURI
    ) public {
        require(
            character[tokenId1].level == 3 && character[tokenId2].level == 3,
            "Character not max level, cannot breed"
        );
        printUniqueAsset(msg.sender, _tokenURI);
    }
}
