export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePassword = (password) => {
    const minLength = 6;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!specialCharPattern.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i=0; i<Math.min(words.length,2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}