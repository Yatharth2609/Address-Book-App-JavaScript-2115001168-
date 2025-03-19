class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        // Validate input fields using regex
        this.validateName(firstName, "First Name");
        this.validateName(lastName, "Last Name");
        this.validateAddressField(address, "Address");
        this.validateAddressField(city, "City");
        this.validateAddressField(state, "State");
        this.validateZip(zip);
        this.validatePhone(phone);
        this.validateEmail(email);

        // Assigning values if all validations passes
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

     // Starts with uppercase, min 3 chars
    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/; 
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} should start with a capital letter and have at least 3 characters.`);
        }
    }

    // Minimun 4 Characters
    validateAddressField(field, fieldName) {
        if (field.length < 4) {
            throw new Error(`${fieldName} should have at least 4 characters.`);
        }
    }

    // IN ZIP format (5 digits or 5+4)
    validateZip(zip) {
        const zipRegex = /^\d{5}(-\d{4})?$/;  
        if (!zipRegex.test(zip)) {
            throw new Error("Invalid ZIP code. It should be 5 digits or in the format 12345-6789.");
        }
    }

    // Exactly 10-digit number
    validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;  
        if (!phoneRegex.test(phone)) {
            throw new Error("Invalid Phone Number. It should be exactly 10 digits.");
        }
    }

    // Basic email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email format.");
        }
    }
}


class AddressBook {
    constructor() {
        this.contacts = [];
    }
}
