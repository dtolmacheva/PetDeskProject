namespace petdesk_project
{
  public class AnimalModel
  {
    public int AnimalId {get; set;}
    public string FirstName {get; set;}

    public string? Species {get; set;} // will be parsed as either guid or int
    public string? Breed {get; set;}


  }
}