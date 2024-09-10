type User = {
    name: string;
    age: number;
    email: string;
    password: string;
    resources: {
        posts: string[];
        comments: string[];
    };
};

const foo = {
    password: "1234",

    checkPassword(password: string) {
        return password === this.password;
    },

    populate<const TResourceType extends keyof User["resources"]>(
        resourceType: TResourceType
    ) {
        return { [resourceType]: [123] };
    },

    getResourcesV2<
        const TResourceType extends keyof User["resources"]
    >(
        resourceType: TResourceType
    ) {
        return this.populate("comments")[resourceType];
    },

    thisWorks() {
        return this.getResourcesV2("comments");
    },
};
