import { Router } from 'express';
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from '../Controllers/paymentController.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/authMiddleware.js';

const router = Router();
  
router.route('/subscribe').post(isLoggedIn, buySubscription);

router.route('/verify').post(isLoggedIn, verifySubscription);
router
  .route('/unsubscribe')
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);
router.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);
router.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), allPayments);

/*older version of the code
router.post('/subscribe',isLoggedIn, buySubscription);
router.post('/verify',isLoggedIn, verifySubscription);
router.post('/unsubscribe',isLoggedIn, authorizeSubscribers, cancelSubscription);
router.get('/razorpay-key',isLoggedIn, getRazorpayApiKey);
router.get('/',isLoggedIn, authorizeRoles('ADMIN'), allPayments);
*/

export default router;