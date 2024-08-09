pragma solidity ^0.8.0;


contract Data {
    address private owner;
    constructor()
    {
        owner = msg.sender;
        addAddr(owner);
    }

    modifier onlyCreator() {
        require(msg.sender == owner);

       _;
    }
    

    function withdrawAll(address payable _to) public onlyCreator {
        _to.transfer(address(this).balance);
    }
    
    
    struct Element {
        uint256 index;
        bool exists;
    }

    
    mapping(address => Element) private elements;
    
    address[] private elementList;

    
    function contains(address _element) public view returns (bool) {
        return elements[_element].exists;
    }

    
    function addAddr(address _element) public onlyCreator {
        if (!contains(_element)) {
            elements[_element] = Element({index: elementList.length, exists: true});
            elementList.push(_element);
        }
    }

    
    function removeAddr(address _element) public onlyCreator {
        if (contains(_element)) {
            uint256 index = elements[_element].index;
            address lastElement = elementList[elementList.length - 1];

            
            elementList[index] = lastElement;
            elements[lastElement].index = index;

            
            elementList.pop();
            delete elements[_element];
        }
    }

    
    function size() public view returns (uint256) {
        return elementList.length;
    }

    
    function get(uint256 _index) public view returns (address) {
        require(_index < elementList.length, "Index out of bounds");
        return elementList[_index];
    }

    
    function getAll() public view returns (address[] memory) {
        return elementList;
    }

    
    event Write(string indexed pid, string be, string bet, uint256 k_m, uint256 k_p,
                   uint256 k_h, string l, uint256 ts);
    

    modifier onlySensor() {
        if (contains(msg.sender) == false)
        {
            revert("must be a sensor address.");
        }

       _;
    }

    function write(string memory pid, string memory be, string memory bet, uint256 k_m, uint256 k_p,
                   uint256 k_h, string memory l, uint256 ts) public payable onlySensor {
        require(msg.value == 10 gwei, "Must send exactly 10 gwei");

        emit Write(pid, be, bet, k_m, k_p, k_h, l, ts);
    }    


   
}

