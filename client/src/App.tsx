import "./App.css";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const App = () => {
  const results = [
    {
      id: 1,
      first: "Aidan",
      last: "Wang",
      dob: "1973-10-16",
      gender: "male",
      email: "aidan.wang@example.com",
      picture: "https://randomuser.me/api/portraits/med/men/93.jpg",
      country: "New Zealand",
      description:
        "This character description generator will generate a fairly random description of a belonging to Aidan Wang. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details of Aidan Wang.",
    },
    {
      id: 2,
      first: "Anna",
      last: "Horten",
      dob: "1972-03-15",
      gender: "female",
      email: "anna.horten@example.com",
      picture: "https://randomuser.me/api/portraits/med/women/48.jpg",
      country: "Norway",
      description:
        "This character description generator will generate a fairly random description of a belonging to Anna Horten. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details of Anna Horten.",
    },
  ];
  const url = "http://localhost:5500";
  //  const fetchData = async <T>(endpoint: string): Promise<T> => {
  //   const response = await axiosInstance.get<T>(endpoint);
  //   return response.data;
  // };

  return (
    <>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name"
          // value={searchTerm}
          // onChange={handleSearch}
          className="pl-8"
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {results.map((el) => {
          return (
            <AccordionItem
              // disabled={editMode !== null}
              key={el.id}
              value={el.id.toString()}
            >
              <Card className="w-full mt-3">
                <AccordionTrigger>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          alt={`${el.first} ${el.last}`}
                          src={el.picture}
                        />
                      </Avatar>
                      <span className="font-semibold text-start">
                        {el.first} {el.last}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* <div className="px-4 pb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm py-2">
                      <span className="text-start">Age</span>
                      <span className="text-start">Gender</span>
                      <span className="text-start">Country</span>
                      <Input
                        disabled
                        className="col-span-1"
                        value={`${age} years`}
                      />
                      <Select
                        value={
                          isEditing ? tempData.gender ?? el.gender : el.gender
                        }
                        onValueChange={(value) => handleChange("gender", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger aria-label="Gender">
                          <SelectValue>
                            {isEditing
                              ? tempData.gender ?? el.gender
                              : el.gender}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Transgender">
                            Transgender
                          </SelectItem>
                          <SelectItem value="Rather not say">
                            Rather not say
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        className="col-span-1"
                        value={
                          isEditing
                            ? tempData.country ?? el.country
                            : el.country
                        }
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="py-2">
                      <p className="text-sm text-start mb-3">Description</p>
                      <Textarea
                        className="min-h-[100px]"
                        value={
                          isEditing
                            ? tempData.description ?? el.description
                            : el.description
                        }
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSave}
                            disabled={!hasChanges || !isFormValid}
                          >
                            <CheckIcon className="h-5 w-5 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCancel}
                          >
                            <Cross2Icon className="h-5 w-5 text-red-600" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(el.id)}
                            disabled={!isEditable}
                          >
                            <Pencil2Icon className="h-5 w-5 text-blue-600" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <TrashIcon className="h-5 w-5 text-red-600" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this account.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(el.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </div> */}
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default App;
