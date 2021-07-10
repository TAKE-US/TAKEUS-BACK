const calculateSKipAndLimit = function (page:number, postNumInPage: number) {

    const limit = +postNumInPage;
    const skip = (page - 1) * limit;

    return { skip : skip, limit : limit };
}

export { calculateSKipAndLimit }