import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react'
import logo from '../Assets/logo.png';
import './SignIn.css';
import AuthValidation from "../utils/AuthValidation"
const SignIn = ({account,contract,provider}) => {
  const navigate = useNavigate();
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [code,setCode]=useState("")
  const [sinedup,setSignedup]=useState(false)
 const onSignIn = async () => {
    //this.setState({ signedUp: false });
try{
//     if (name !== '' && password !== '' && code !== '') {
//        setName(name.trim());
//        setPassword(password.trim());
//        setCode(code.trim());
// let usernameToSend=name;        

//         //===
//         // if (password.length < 8) {
//         //     this.setState({
//         //         alertMessage: "at least 8 characters for password",
//         //         status: 'failed',
//         //         password: '',
//         //         digicode: '',
//         //     });
//             return;
//         }
         if (code.length !== 6) {
            // this.setState({
            //     alertMessage: "6 digit required for digicode",
            //     status: 'failed',
            //     digicode: ''
            // });
            window.alert("Fill the form correctly")
            return
        } else {
            let useraddress = await contract.getUserAddress()
              // .call({ from:account });
            console.log(useraddress)
            if (useraddress == '0x0000000000000000000000000000000000000000') {
                // this.setState({
                //     alertMessage: 'this account already exists',
                //     status: 'failed',
                //     username: '',
                //     password: '',
                //     digicode: '',
               // });
window.alert("this account doesn't exists")
                return;
            } 
              else {
                let validated = await
                    AuthValidation(
                        name,
                        account,
                        password,
                        code,
                        provider,
                        contract
                    );

                if (!validated) {
                    // this.setState({
                    //     alertMessage: 'Incorrect log in',
                    //     status: 'failed',
                    //     username: '',
                    //     password: '',
                    //     digicode: '',
                    // });
                    window.alert("Unable to Login")
                    return
                } else {
                    // this.setState({
                    //     username: '',
                    //     password: '',
                    //     digicode: '',
                    //     status: 'success',
                    //     alertMessage: "Sign in successful",
                    //     loggedIn: true
                    // });

                    // this.props.userSignedIn(
                    //     this.state.loggedIn,
                    //     usernameToSend
                    // );
                    window.alert("Login successful")
                    navigate("/fileupload");
                    return;
                }
            }
        }
      }catch(e){
        window.alert(e)
      }
    }
    const signIn=(e)=>{
e.preventDefault()
onSignIn()
    }
  return (

    <div class='wrapper1'>
    <div className='logo-img'>
          <img src={logo} className="Web-Logo" alt="logo" />
    </div>

      <form onSubmit={signIn} >

        <h1>Sign In</h1>

        <input type="text"
        placeholder='Your Name'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>

        <input type="password" 
        placeholder='Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} ></input>
        
        <input type='number' 
        placeholder='Your Code'
         value={code} onChange={(e)=>{setCode(e.target.value)}} ></input>
        
        <input type="submit" value="Login" className="btn1" />
        
        <div class='member'>
        Don't have an account? <a href="/signup">Click to create</a>
        </div> 

      </form>
    </div>
  )

}

export default SignIn
