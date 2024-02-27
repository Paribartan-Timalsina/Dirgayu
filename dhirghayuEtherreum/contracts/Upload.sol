// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct User {
        string signatureHash;
        address userAddress;
    }
    struct Patients {
        string name;
        uint phone;
        string gender;
        string dob;
        uint height;
        uint weight;
        string houseaddr;
        string bloodgroup;
        string emergencyName;
        string emergencyContact;

        //address addr;
        //uint date;
    }
    struct Treatment {
        string diseases;
        string medication;
        bool status;
    }

    struct Data {
        Treatment[] treatments;
    }

    struct Doctors {
        string ic;
        string name;
        uint phone;
        string gender;
        string dob;
        string qualification;
        string major;
        //address addr;
        //uint date;
    }

    struct Appointments {
        address doctoraddr;
        address patientaddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }
    struct Access {
        address user; //which user the connected user has given access to
        bool access; //true or false
    }
    address public owner;
    uint256 public nbOfUsers;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;
    mapping(address => User) private user;
    mapping(address => Patients) patients;
    mapping(address => Doctors) doctors;
    mapping(string => Doctors) namedoctors;
    mapping(address => Appointments) appointments;
    mapping(address => bytes32) hashedDetails;
    mapping(address => mapping(address => bool)) isApproved;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint) AppointmentPerPatient;
    mapping(address => Data) private _data;
    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;

    mapping(address => string[]) value; //address is the address of the connected wallet and string array takes the url of images stored in IPFS
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList; //address-connected smart contract
    mapping(address => mapping(address => bool)) previousData;

    constructor() {
        owner = msg.sender;
        nbOfUsers = 0;
    }

    function addTreatment(
       Treatment memory _t
    ) public {
        _data[msg.sender].treatments.push(
            _t
        );
    }

    function getTreatments() public view returns (Treatment[] memory) {
        return _data[msg.sender].treatments;
    }
function updateTreatmentStatus(string memory diseases, bool status) public {
    Treatment[] storage treatments = _data[msg.sender].treatments;
    for (uint i = 0; i < treatments.length; i++) {
        if (keccak256(bytes(treatments[i].diseases)) == keccak256(bytes(diseases))) {
            treatments[i].status = status;
        }
    }
}

    function isPatients(address _addr) public view returns (bool) {
        return isPatient[_addr];
    }

    function isDoctors(address _addr) public view returns (bool) {
        return isDoctor[_addr];
    }

    function setPatientDetails(Patients memory _p) public {
       // require(!isPatient[msg.sender]);
        //  p = patients[msg.sender];

        // p.ic = _ic;
        // Patients memory p=Patients(_p.name,_p.phone,_p.gender,_p.dob,_p.height,_p.weight,_p.houseaddr,_p.bloodgroup,_p.allergies,_p.medication,_p.emergencyName,_p.emergencyContact);
        Patients memory p;

        p.name = _p.name;
        p.phone = _p.phone;
        p.gender = _p.gender;
        p.dob = _p.dob;
        p.height = _p.height;
        p.weight = _p.weight;
        p.houseaddr = _p.houseaddr;
        p.bloodgroup = _p.bloodgroup;

        p.emergencyName = _p.emergencyName;
        p.emergencyContact = _p.emergencyContact;
        // p.addr = msg.sender;
        // p.date = block.timestamp;
        patients[msg.sender] = p;
        bytes32 detailsHash = keccak256(abi.encode(p));
        hashedDetails[msg.sender] = detailsHash;
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }
function setasDoctor () public {
isDoctor[msg.sender]=true;
}
function setasPatient () public {
isPatient[msg.sender]=true;
}

    function setdoctorDetails(Doctors memory _d) public {
       // require(!isDoctor[msg.sender]);
        // var d = doctors[msg.sender];
        Doctors memory d;
        d.ic = _d.ic;
        d.name = _d.name;
        d.phone = _d.phone;
        d.gender = _d.gender;
        d.dob = _d.dob;
        d.qualification = _d.qualification;
        d.major = _d.major;
        doctors[msg.sender] = d;
        namedoctors[_d.name] = d;
        // d.addr = msg.sender;
        // d.date = block.timestamp;
        //   bytes32 detailsHash = keccak256(abi.encodePacked(_name, _phone, _gender,_dob,_qualification,_major));
        //hashedDetails[msg.sender] = detailsHash;
        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

  
    function getPatientDetails() public view returns (Patients memory) {
        // require(isPatient[msg.sender], "Only patients can call this function");
        // bytes32 detailsHash = hashedDetails[userAddress];
        //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));

        return patients[msg.sender];
    }

    function getPatientName() public view returns (string memory) {
        // require(isPatient[msg.sender], "Only patients can call this function");
        // bytes32 detailsHash = hashedDetails[userAddress];
        //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));

        return patients[msg.sender].name;
    }

    function getDoctorDetails() public view returns (Doctors memory) {
        // require(isDoctor[msg.sender], "Only doctors can call this function");
        // bytes32 detailsHash = hashedDetails[userAddress];
        //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));

        return doctors[msg.sender];
    }
    function getDoctorName() public view returns (string memory) {
        // require(isDoctor[msg.sender], "Only doctors can call this function");
        // bytes32 detailsHash = hashedDetails[userAddress];
        //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));

        return doctors[msg.sender].name;
    }

    function getfulldetails(
        string memory _name
    ) public view returns (Doctors memory) {
        return namedoctors[_name];
    }

    //Retrieve patient count
    function getPatientCount() public view returns (uint256) {
        return patientCount;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns (uint256) {
        return doctorCount;
    }

    //Retrieve appointment count
    function getAppointmentCount() public view returns (uint256) {
        return appointmentCount;
    }

    //Retrieve permission granted count
    function getPermissionGrantedCount() public view returns (uint256) {
        return permissionGrantedCount;
    }

    //Retrieve permission granted count
    function getAppointmentPerPatient(
        address _address
    ) public view returns (uint256) {
        return AppointmentPerPatient[_address];
    }

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disallow(address _user) public {
        ownership[msg.sender][_user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory,Treatment[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You Donot Have Access"
        );
        return (value[_user],_data[msg.sender].treatments);
    }

function displaydiseases(address _user) external view returns (Treatment[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You Donot Have Access"
        );
        return _data[msg.sender].treatments;
    }
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function register(string memory _signature,string memory _role) public {
        require(
            user[msg.sender].userAddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );
    bytes32 roleHash = keccak256(abi.encodePacked(_role));
bytes32 doctorHash = keccak256(abi.encodePacked("Doctor"));
bytes32 patientHash = keccak256(abi.encodePacked("Patient"));
        user[msg.sender].signatureHash = _signature;
        user[msg.sender].userAddress = msg.sender;
        nbOfUsers++;
      if (roleHash == doctorHash) {
    isDoctor[msg.sender] = true;
} else if (roleHash == patientHash) {
    isPatient[msg.sender] = true;
}
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].userAddress, "Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }
}
