using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace petdesk_project
{
  [ApiController]
  [Route("[controller]")]
  public class AppointmentController : ControllerBase
  {
    private static IEnumerable<AppointmentModel>? appointments;

    [HttpGet]
    public async Task<IEnumerable<AppointmentModel>> Get()
    {
      using (HttpClient client = new HttpClient())
      {
        string url = "https://723fac0a-1bff-4a20-bdaa-c625eae11567.mock.pstmn.io/appointments";
        appointments = await client.GetFromJsonAsync<IEnumerable<AppointmentModel>>(url);        
        return  appointments;
      }
    }

    [HttpPut("{confirm}/{id:int}")] // item/confirm/1
    public async Task<AppointmentModel?> ConfirmAppointmentDate(int id)
    {
      try
      {
        // confirm appointment with the id
        if (appointments == null) 
        {
          appointments = await Get();        
        }

        AppointmentModel appointment = appointments.Where(apt => apt.AppointmentId == id).First();      
        appointment.isConfirmed = true;
        return appointment;

      }
      catch (Exception)
      {
        // return error if appointment with that id was not found
        return null;
      }
    }

    [HttpPut("{id:int}")]
    public async Task<AppointmentModel?> UpdateAppointmentSuggestedDate(int id, [FromBody] DateTimeOffset suggestedDate)
    {
      try
      {
        // update appointment with new suggested date

        if (appointments == null) 
        {
          appointments = await Get();
        }
      
        AppointmentModel apt = appointments.Where(apt => apt.AppointmentId == id).First();      
        apt.RequestedDateTimeOffset = suggestedDate;
        return apt;
      }
      catch (Exception)
      {
        // return error if appointment with that id was not found
        return null;
      }      
    }
  } 
}