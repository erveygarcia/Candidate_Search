// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    name?: string;
    avatar_url: string;
    location?: string;
    email? : string;
    html_url: string;
    company?: string;
    bio?: string;
}