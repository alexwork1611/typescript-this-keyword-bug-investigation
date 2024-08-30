namespace App.Models {
  type Model = { id: string };

  type Organization = Model;
  type Franchise = Model;
  type Location = Model;
  type Concept = Model;

  type UserPopulatePaths = {
    organizations: App.Models.Organization[];
    franchises: App.Models.Franchise[];
    locations: App.Models.Location[];
    concepts: App.Models.Concept[];
  };
}
