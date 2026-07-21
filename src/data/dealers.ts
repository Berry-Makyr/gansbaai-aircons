export type Dealer = {
  id: string;
  name: string;
  logoSrc: string | null;
  logoAlt: string;
};

export const dealers: Dealer[] = [
  {
    id: "samsung",
    name: "Samsung",
    logoSrc: "/dealers/samsung.png",
    logoAlt: "Samsung approved dealer",
  },
  {
    id: "lg",
    name: "LG",
    logoSrc: "/dealers/lg.png",
    logoAlt: "LG approved dealer",
  },
  {
    id: "alliance",
    name: "Alliance",
    logoSrc: "/dealers/alliance.png",
    logoAlt: "Alliance approved dealer",
  },
  {
    id: "scotsman",
    name: "Scotsman",
    logoSrc: "/dealers/scotsman.png",
    logoAlt: "Scotsman approved dealer",
  },
  {
    id: "staycold",
    name: "Staycold",
    logoSrc: "/dealers/staycold.png",
    logoAlt: "Staycold approved dealer",
  },
  {
    id: "comfee",
    name: "Comfee",
    logoSrc: "/dealers/comfee.png",
    logoAlt: "Comfee approved dealer",
  },
];
