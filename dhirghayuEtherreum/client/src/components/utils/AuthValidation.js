import SignData from './SignData';
import { ethers } from 'ethers';
const AuthValidation = async (name, account, password, code, provider, contract) => {
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
 // let userAddress = await contract.getUserAddress().call({ from: account });
  let messageHash = ethers.utils.id(password+code);
  let messageHashBytes = ethers.utils.arrayify(messageHash)
  let flatSig = await wallet.signMessage(messageHashBytes);
  let hashFromContract = await contract.getSignatureHash();
  if(flatSig===hashFromContract){
    return true;
  }else{
    return false;
  }
      }catch(e){
          window.alert(e)
      }
    // let userAddress = await contract.methods.getUserAddress().call({ from: account });

    // if (userAddress.toLowerCase() !== account.toLowerCase()) {
    //     return false;
    // } else {
    //     let signedData = await SignData(name, account, provider);
    //     let passwordDigiCodeHash = await provider.accounts.hashMessage(password + code);

    //     let hash = await provider.accounts.hashMessage(signedData + passwordDigiCodeHash);

    //     // get hash from the contract
    //     let hashFromContract = await contract.methods.getSignatureHash().call({ from: account });

    //     if (hash === hashFromContract) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

export default AuthValidation;