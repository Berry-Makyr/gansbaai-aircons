import type { StructureResolver } from "sanity/structure";

const singletonId = (typeName: string) => typeName;

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(singletonId(typeName)));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      S.listItem()
        .title("Business Details")
        .child(
          S.list()
            .title("Business Details")
            .items([singletonListItem(S, "siteSettings", "Contact & Settings")])
        ),
      S.divider(),
      S.listItem()
        .title("Homepage Sections")
        .child(
          S.list()
            .title("Homepage Sections")
            .items([
              singletonListItem(S, "hero", "Hero"),
              singletonListItem(S, "whyChooseUs", "Why Choose Us"),
              singletonListItem(S, "communityOutreach", "Community Outreach"),
              singletonListItem(S, "legacy", "Our Legacy"),
              singletonListItem(S, "dealersSection", "Approved Dealers"),
              singletonListItem(S, "reviewsSection", "Customer Reviews"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("enquiry").title("Website Enquiries"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("galleryImage").title("Gallery Images"),
    ]);
