import { gql } from '@apollo/client';
import { ProfileInfo } from '../fragments/profile.fragments';

export const CreateUser = gql`
    mutation CreateUser($email: String!, $password: String!){
        createUser(email: $email, password: $password) {
            email
            role
            profiles {
                ...profileInfo
            }
        }
    }
    ${ProfileInfo}
`;

export const Login = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            email
            role
            token
            id
            profiles {
                ...profileInfo
            }
        }
    }
    ${ProfileInfo}
`;

export const UpgradeUser = gql`
    mutation UpgradeUser($userId: Int) {
        upgradeUser(userId: $userId)
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser($userId: Int) {
        deleteUser(userId: $userId)
    }
`;
