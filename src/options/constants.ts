export const MAX_RESULTS_PER_PAGE = parseInt(process.env.MAX_RESULTS_PER_PAGE || "20");

export const MAX_RESULTS = (page: number) => (page - 1) * MAX_RESULTS_PER_PAGE;
