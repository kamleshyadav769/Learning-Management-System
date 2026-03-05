import { Router } from 'express';

import {
  addLectureToCourseById,
  createCourse,
  deleteCourseById,
  getAllCourses,
  getLecturesByCourseId,
  removeLectureFromCourse,
  updateCourseById,
} from '../Controllers/courseController.js';
import {
  authorizeRoles,
 // authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = Router();

// , isLoggedIn, authorizeRoles("ADMIN", "USER") - middlewares

// OLD Code
 router.get("/", getAllCourses);
 router.post("/",isLoggedIn, authorizeRoles("ADMIN"), upload.single('thumbnail'), createCourse);    //isLoggedIn, authorizeRoles("ADMIN"),
 router.put("/:id",isLoggedIn, authorizeRoles("ADMIN"), updateCourseById);
 router.delete("/:id",isLoggedIn, authorizeRoles("ADMIN"), deleteCourseById);
 router.post("/:id",isLoggedIn, authorizeRoles("ADMIN"), upload.single('lecture'), addLectureToCourseById);// upload.single('lecture'),
router.delete("/",isLoggedIn, authorizeRoles("ADMIN"), removeLectureFromCourse);

 // router.delete(
//   "/",
//   isLoggedIn,
//   authorizeRoles("ADMIN"),
//   removeLectureFromCourse
// );
 router.get("/:id", isLoggedIn, getLecturesByCourseId);
// router.post(
//   "/:id",
//   isLoggedIn,
//   authorizeRoles("ADMIN"),
//   upload.single("lecture"),
//   addLectureToCourseById
// );
// router.delete("/:id", isLoggedIn, authorizeRoles("ADMIN"), deleteCourseById);

// Refactored code
/*router
  .route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
  )
  .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

router
  .route('/:id')
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById);
*/
export default router;