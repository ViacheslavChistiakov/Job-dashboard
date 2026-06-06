export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    level: string;
    salary: number;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}