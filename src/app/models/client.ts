export interface IClient {
    coordonnees: {
        firstname: string,
        lastname: string,
        mail: string,
        tel: string,
    },
    items: { 
        nom: string,
        quantite: number,
        url: string
    }[];
}
