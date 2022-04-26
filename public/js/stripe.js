import axios from "axios";
import { showAlert } from "./alert";
// var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const stripe = Stripe('pk_test_51Kr47dSJQSj6VWcw1NEJVsLNidjyIUinZyYKp7NwHPq42ZSwXhlOENJRFKgPeECCRyrXqWKvl3LGMZE1l3rJ4TZe00r5TOHauc');

export const bookTour = async tourId => {
    // console.log(tourId);
    try {
        const session = await axios(
            `/api/v1/bookings/checkout-session/${tourId}`
            );
        console.log(session);

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch (err) {
        // console.log(err);
        showAlert('error', err)
    }
};