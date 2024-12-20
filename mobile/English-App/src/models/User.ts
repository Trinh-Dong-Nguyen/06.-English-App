type User = {
    id: string;
    createDate: string;
    updateDate: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date;
    avatarURL: string;
    awsCognitoId: string;
    additionalInfo: {
        schoolName: string;
    };
};

export default User;