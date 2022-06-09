class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        let count = 0;
        while (count < this.length) {
            let testKVP = hashTable[index];
            // IF IT'S nullptr, IT CAN'T BE IN THE HASH TABLE
            if (testKVP == null) {
                return null;
            }
            // IF A KVP USES THIS KEY, RETURN ITS VALUE
            else if (testKVP.key == key) {
                return testKVP.value;
            }
            index++;
            // WE MAY NEED TO RESET index TO LOOK IN THE FRONT OF THE HASH TABLE
            if (index == this.length)
                index = 0;
            count++;
        }
        // IT WAS NOT IN THE FULL HASH TABLE, SO RETURN nullptr
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        let index = this.hashCode(key); // THIS IS THE NATURAL INDEX
        let count = 0;
        //console.log("The index:");
        //console.log(index);
        console.log("The size: ");
        console.log(this.size);
        //console.log("The length: ");
        //console.log(this.length);
        
        while (count < this.length) {
            let testKVP = this.hashTable[index];
            // IF IT'S AVAILABLE, PUT IT HERE
            if (testKVP == null) {
                this.hashTable[index] = new KeyValuePair(key, item);
                this.size++;
                return;
            }
            // IF ANOTHER KVP ALREADY USES THIS KEY, REPLACE IT
            else if (testKVP.key == key) {
                this.hashTable[index].value = item;
                this.size++;
                return;
            }
            index++;
            // WE MAY NEED TO RESET index TO LOOK IN THE FRONT OF THE HASH TABLE
            if (index == this.length)
                index = 0;
            count++;
        }
        
        // WE DIDN'T FIND AN EMPTY SPOT OR AN ITEM WITH THE SAME
        // KEY SO WE NEED A BIGGER HASH TABLE. SO MAKE A BIGGER
        // ONE AND PUT ALL THE OLD VALUES IN THE NEW ONE
        let temp = this.hashTable;
        this.length = this.length*2;
        console.log("New length: ");
        console.log(this.length);   
        let z = 0;
        console.log("z is : " + z);
        z++;
        this.hashTable = [];
        //console.log("The length of the hashtable: ");
        
        // FIRST CLEAR IT OUT
        for (let i = 0; i < this.length; i++) {
            //console(this.length);
            this.hashTable[i] = null;
        }
        
        // THEN MOVE ALL THE OLD VALUES OVER
        let numToCopy = this.size;
        this.size = 0;
        for (let i = 0; i < numToCopy; i++) {
            let kvp = temp[i];
            let keyToMove = kvp.key;
            let valueToMove = kvp.value;
            this.putValue(keyToMove, valueToMove);
            kvp = null;
        }
        temp = null;
        
        // AND REMEMBER TO ADD THE NEW ONE
        this.putValue(key, item);

    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};