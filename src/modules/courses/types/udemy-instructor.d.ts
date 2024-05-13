/**
 * Represents a Udemy user profile.
 */
export interface UdemyUserProfile {
    /**
     * The title of the user.
     */
    title: string;
    /**
     * The first name of the user.
     */
    name: string;
    /**
     * The display name of the user.
     */
    display_name: string;
    /**
     * The job title of the user.
     */
    job_title: string;
    /**
     * The URL of the user's 50x50 image.
     */
    image_50x50: string;
    /**
     * The URL of the user's 100x100 image.
     */
    image_100x100: string;
    /**
     * The initials of the user.
     */
    initials: string;
    /**
     * The URL of the user's profile.
     */
    url: string;
}
