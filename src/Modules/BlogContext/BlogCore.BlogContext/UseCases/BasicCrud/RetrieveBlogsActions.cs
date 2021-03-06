using BlogCore.Core;
using BlogCore.Infrastructure.EfCore;
using BlogCore.Infrastructure.UseCase;
using System;

namespace BlogCore.BlogContext.UseCases.BasicCrud
{
    public class RetrieveBlogsRequest : IRequest<PaginatedItem<RetrieveBlogsResponse>>, IRetrieveItemWithPage
    {
        public RetrieveBlogsRequest(int currentPage)
        {
            CurrentPage = currentPage < 1 ? 1 : currentPage;
        }

        public int CurrentPage { get; private set; }
    }

    public class RetrieveBlogsResponse
    {
        public RetrieveBlogsResponse(
            Guid id,
            string title,
            string description,
            string image,
            int theme)
        {
            Id = id;
            Title = title;
            Description = description;
            Image = image;
            Theme = theme;
        }

        public Guid Id { get; }
        public string Title { get; }
        public string Description { get; }
        public string Image { get; }
        public int Theme { get; }
    }
}