// const SignData = async (name, account, provider) => {
//     let signedData;

//     await provider.personal.sign(
//         name,
//         account,
//         (err, signature) => {
//             if (err) {
//             window.alert(err)
//                 signedData = err;
//             } else {
//                 signedData = provider.hashMessage(signature);
//             }
//         }
//     );
//     return signedData;
// }

// export default SignData;