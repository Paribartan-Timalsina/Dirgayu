//import SignData from './SignData';
import {ethers} from "ethers"
const { keccak256 } = require('ethers').utils;

const AuthenticationHash = async (name, account, password, code, provider) => {
    //let signedMessage = await SignData(name, account, provider);
    try{
      let privateKey = 'your_private_key';
      let wallet = new ethers.Wallet(privateKey);
//         // Sign the string message
// let flatSig = await wallet.signMessage(password+code);

//     //let passwordDigiCodeHash = await provider.account.hashMessage(password + code);
// // For Solidity, we need the expanded-format of a signature
// let sig = ethers.utils.splitSignature(flatSig);
//    // return await provider.account.hashMessage(passwordDigiCodeHash);
//    return sig

let messageHash = ethers.utils.id(password+code);
let messageHashBytes = ethers.utils.arrayify(messageHash)
let flatSig = await wallet.signMessage(messageHashBytes);
return flatSig
    }catch(e){
        window.alert(e)
    }
}
export default AuthenticationHash;