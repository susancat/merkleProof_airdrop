import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

export default function Home() {
  const addresses = ["0x199E111e07C9cA1284b6B174Af7B2FDFb9fffcC9","0x91E81f56C9E156496423bc3b9DD2C38d402614b3","0xc28b02f9316E3D9c0BF7cfE14dbaBC6D67230E78","0x5b1c6f61cb65887C83512B859f67e62a626d9D84"];
  const leaves = addresses.map(x => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  //according to merkleProof.sol the pairs of leaves should be sorted
  const bufferToHex = x => '0x' + x.toString('hex');//specify the stringify type as hex

  console.log(bufferToHex(tree.getRoot()));//to get a hash root of the addresseslea

  //use addresses[1] as an example for claiming
  //bufferToHex(leaves[1]) 
  //keccak256(leaves[1]) 
  const leaf = keccak256(addresses[1])
  const proof = tree.getProof(leaf)

  const _proof = proof.map(x => bufferToHex(x.data));
  console.log(_proof); 
  //["0xfeb3c45f930e5ddfbb36a097e8f8c5079b64b133339a45ce957694b6c196acc0","0xc57bc3dfdb07a54e1f55eeb5cca9b96cfb6ec91530e2495a61788c7c00b193e6"]
  //remove the spaces and input to claim(_proof)
  //here have to interact with addresses[1]

  //contract.methods.safeMint(addresses[1], proof).send({ from: addresses[1] }) // will be called on click of the mint button by the claimer
  return (
    <div>
      <h4>Merkle Tree</h4>
    </div>
  )
}
