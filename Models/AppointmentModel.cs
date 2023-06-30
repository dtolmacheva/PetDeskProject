namespace petdesk_project
{
  public class AppointmentModel
  {
    public int AppointmentId {get; set;}
    public string AppointmentType {get; set;}

    public DateTime CreateDateTime {get; set;}
    public DateTimeOffset RequestedDateTimeOffset {get; set;}

    public int User_UserId {get; set;} // will be parsed as either guid or int
    public int Animal_AnimalId {get; set;}

    public UserModel User {get; set;}

    public AnimalModel Animal {get; set;}

    public bool? isConfirmed {get; set;}
  }
}