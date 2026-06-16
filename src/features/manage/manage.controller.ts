import { Request, Response } from "express";
import {
  getPostToEdit,
  getUsersPosts,
  unpublishUserPost,
  updatePost,
} from "./manage.services.js";
import {
  jobFormOptions,
  specializationsByCategory,
  citiesByProvince,
} from "../jobs/jobs.constants.js";

export async function showUserDashboard(req: Request, res: Response) {
  const actionError = req.query.error as string | null;
  const token = req.query.token as string;
  const result = await getUsersPosts(token);

  if (result.success === false) {
    if (
      result.error.reason === "TOKEN_EXPIRED" ||
      result.error.reason === "TOKEN_NOT_FOUND"
    ) {
      return res.status(403).render("manage/invalid-token");
    }
    return res.status(500).render("error");
  }

  res.render("manage/dashboard", { posts: result.data, actionError, token });
}

export async function showEditform(req: Request, res: Response) {
  const token = req.query.token as string;
  const postId = Number(req.params.id);
  const result = await getPostToEdit(postId, token);

  if (result.success === false) {
    return res.redirect(`/manage?token=${token}&error=post_not_found`);
  }

  res.render("manage/edit", {
    jobFormOptions,
    values: result.data,
    id: postId,
    token,
    specializationsByCategory: JSON.stringify(specializationsByCategory),
    citiesByProvince: JSON.stringify(citiesByProvince),
    fieldErrors: {},
  });
}

export async function submitEditform(req: Request, res: Response) {
  const token = req.query.token as string;
  const postId = Number(req.params.id);

  const result = await updatePost(postId, token, req.body);
  if (result.success === false) {
    return res.redirect(`/manage?token=${token}&error=update_failed`);
  }

  return res.render("success", {
    title: "Job Updated",
    message: "Your job posting has been successfully updated.",
    link: {
      href: `manage?token=${token}`,
      label: "Back to Dashboard",
    },
  });
}

export async function unpublishPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  const token = req.query.token as string;
  const result = await unpublishUserPost(id, token);

  if (result.success === false) {
    return res.redirect(`/manage?token=${token}&error=deletion_failed`);
  }

  res.redirect(`/manage?token=${token}`);
}
