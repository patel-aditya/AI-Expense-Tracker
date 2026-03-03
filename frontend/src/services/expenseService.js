import api  from "./api";

export const getExpenses = async() =>{
    const response = await api.get("/expenses/");
    return response.data;
}

export const addExpense = async(data) =>{
    const response = await api.post("/expenses/", data);
    return response.data;
}

export const deleteExpense = async(id) =>{
    await api.delete(`/expenses/${id}`);
}