import api from './api';

export const updateVolunteerDetails =  (data) => {
    const id=localStorage.getItem('userId');
    const response = api.post(`/volunteers/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
          },
    });
    return response.data;
}

export const updateDisasterReport =  (id,data) => {
    const response = api.post(`/volunteers/${id}`, data,{
        headers: {
            "Content-Type": "application/json",
          },
    });
    return response.data;
}

export const getVolunteers = async () => {
    const response = await api.get('/volunteers');
    return response.data;
};

export const deleteVolunteer = async (id) => {
    const response = await api.delete(`/volunteers/${id}`);
    return response.data;
};