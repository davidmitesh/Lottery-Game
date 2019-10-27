import Web3 from 'web3';
console.log(window.web3.version)
const web3=new Web3(window.web3.currentProvider);//to wipe out the current
//provider of the browser set up by the metamask

export default  web3;
