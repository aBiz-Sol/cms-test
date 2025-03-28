export const GetInitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
        const firstNameInitial = firstName
            ?.charAt(0)
            ?.toUpperCase()
        const lastNameInitial = lastName
            ?.charAt(0)
            ?.toUpperCase()
        return `${firstNameInitial}${lastNameInitial}`
    }
}