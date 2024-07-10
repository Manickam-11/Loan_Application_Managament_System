CREATE TABLE loan (
    id SERIAL PRIMARY KEY,
    applicant_name VARCHAR(255),
    amount DOUBLE PRECISION,
    status VARCHAR(255)
);
