export const getManufactures = async () => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/manufactures`;
    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });
    // get data
    const result = await response.json();
    return result;
};