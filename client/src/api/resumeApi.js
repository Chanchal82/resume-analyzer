import Api from "./axios";

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("file", file);  
    const res = await Api.post("/resume/upload", formData);
    return res.data;
}