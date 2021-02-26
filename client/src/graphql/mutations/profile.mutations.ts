import { gql } from '@apollo/client';
import { ProfileInfo } from '../fragments/profile.fragments';

export const CreateProfile = gql`
    mutation CreateProfile($profile: ProfileInfo!) {
        createProfile(profile: $profile) {
            id
        }
    }
`;

export const DeleteProfile = gql`
    mutation DeleteProfile($profileId: Int) {
        deleteProfile(profileId: $profileId)
    }
`;

export const UpdateProfile = gql`
    mutation UpdateProfile($profile: ProfileInfo) {
        updateProfile(profile: $profile) {
            ...profileInfo
        }
    }
    ${ProfileInfo}
`;
