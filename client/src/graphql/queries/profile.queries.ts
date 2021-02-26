import { gql } from '@apollo/client';
import { ProfileInfo } from '../fragments/profile.fragments';

export const GetProfilesById = gql`
    query GetProfilesById($userId: Int) {
        profiles(userId: $userId) {
            ...profileInfo
        }
    }
    ${ProfileInfo}
`;
