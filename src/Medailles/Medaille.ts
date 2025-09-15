export interface Medal {
    type: string;
    code: number;
}

export interface Athlete {
    name: string;
    gender: string;
    code: string;
}

export interface Event {
    name: string;
    discipline: string;
    type: string;
    url: string;
}

export interface Country {
    code: string;
    name: string;
    long_name: string;
}
//interface finale Medaille
export interface Medaille {
    medal: Medal;
    date: string;
    athlete: Athlete;
    event: Event;
    country: Country;
}


// // exemple data
// const exampleMedaille: Medaille = {
//     medal: {
//         type: "Gold Medal",
//         code: 1.0
//     },
//     date: "2024-07-27",
//     athlete: {
//         name: "Remco EVENEPOEL",
//         gender: "M",
//         code: "1903136"
//     },
//     event: {
//         name: "Men's Individual Time Trial",
//         discipline: "Cycling Road",
//         type: "ATH",
//         url: "/en/paris-2024/results/cycling-road/men-s-individual-time-trial/fnl-000100--"
//     },
//     country: {
//         code: "BEL",
//         name: "Belgium",
//         long_name: "Belgium"
//     }
// };